import axios from "axios";
import { Services } from "../Config/Services";

interface TrackingEvent {
  date: string;
  to: string;
  from: string;
  location: string;
  originalTitle: string;
  details: string;
}

export interface ResponseObject {
  code: string;
  service_provider: string;
  data: TrackingEvent[];
  status?: string;
}

export interface TrackingResult {
  success: boolean;
  result: (ResponseObject | { code: string; error: string })[];
}

export class MelhorRastreio {
  private apiUrl: string = "https://api.melhorrastreio.com.br/graphql";
  private serviceProvider: string = "api.melhorrastreio.com.br";

  private setStatus(status: string, error: boolean = false): string {
    return error ? "" : Services.getMessageError();
  }

  async tracking(codes: string): Promise<TrackingResult> {
    const codesArray = this.objectsCodes(codes);
    if (!Array.isArray(codesArray) || codesArray.length === 0) {
      throw new Error("Invalid or empty codes");
    }

    const results: TrackingResult = {
      success: true,
      result: [],
    };

    for (const code of codesArray) {
      try {
        const res = await this.httpGet(code);
        results.result.push(res);
      } catch (error) {
        results.result.push({ code, error: (error as Error).message });
      }
    }

    return results;
  }

  private objectsCodes(codes: string): string[] {
    return codes.split(",").map((code) => code.trim());
  }

  private async httpGet(code: string): Promise<ResponseObject> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          query: `mutation searchParcel ($tracker: TrackerSearchInput!) {
            result: searchParcel (tracker: $tracker) {
              id
              createdAt
              updatedAt
              lastStatus
              trackingEvents {
                trackerType
                trackingCode
                createdAt
                title
                description
                location {
                  complement
                  city
                  state
                }
              }
            }
          }`,
          variables: { tracker: { trackingCode: code, type: "correios" } },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (!data || data.errors) {
        throw new Error("Invalid response");
      }

      const responseObject: ResponseObject = {
        code,
        service_provider: this.serviceProvider,
        data: [],
      };

      const result = data.data.result;
      if (!result || !result.trackingEvents) {
        throw new Error("No tracking events found");
      }

      // Processa os eventos de rastreamento
      result.trackingEvents.forEach(
        (event: {
          createdAt: string;
          location: any;
          to: string;
          from: string;
          title: string;
          description: string;
        }) => {
          const location = `${event.location.complement} - ${event.location.city}/${event.location.state}`;
          responseObject.data.push({
            date: new Date(event.createdAt).toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            to: event.to || "",
            from: event.from || "",
            location: location,
            originalTitle: event.title || event.description,
            details: event.description,
          });
        }
      );

      // Ordena os eventos por data decrescente
      responseObject.data.sort(
        (a: TrackingEvent, b: TrackingEvent) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      responseObject.status =
        responseObject.data.length > 0
          ? this.setStatus(responseObject.data[0].originalTitle)
          : this.setStatus("", true);

      return responseObject;
    } catch (error) {
      throw new Error("Error fetching tracking data");
    }
  }
}
