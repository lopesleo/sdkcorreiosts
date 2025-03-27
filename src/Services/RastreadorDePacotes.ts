import axios from "axios";

interface TrackingEvent {
  date: string;
  to: string;
  from: string;
  location: string;
  originalTitle: string;
  details: string;
}

interface ResponseObject {
  code: string;
  service_provider: string;
  data: TrackingEvent[];
  status?: string;
}

interface TrackingResult {
  success: boolean;
  result: (ResponseObject | { code: string; error: string })[];
}

export class RastreadorDePacotes {
  private apiUrl: string = "https://api.rastreadordepacotes.com.br/rastreio/";
  private serviceProvider: string = "www.rastreadordepacotes.com.br";

  private setStatus(status: string, error: boolean = false): string {
    return error ? "" : status;
  }

  async rastrear(codes: string): Promise<TrackingResult> {
    const codesArray = this.formatarCodigos(codes);
    if (!codesArray.length) {
      throw new Error("Códigos inválidos ou vazios");
    }

    const resultados: TrackingResult = {
      success: true,
      result: [],
    };

    for (const code of codesArray) {
      try {
        const res = await this.buscarDados(code);
        resultados.result.push(res);
      } catch (error) {
        resultados.result.push({ code, error: (error as Error).message });
      }
    }

    return resultados;
  }

  private formatarCodigos(codes: string): string[] {
    return codes.split(",").map((code) => code.trim());
  }

  private async buscarDados(code: string): Promise<ResponseObject> {
    try {
      const response = await axios.get(`${this.apiUrl}${code}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Resposta da API:", response.data); // Veja o que está retornando
      const data = response.data;
      if (!data || !data.tracking || !data.tracking[0]) {
        throw new Error("Nenhum dado de rastreamento encontrado");
      }

      const posicoes = [...(data.tracking[0].Posicoes || [])].reverse();
      const responseObject: ResponseObject = {
        code,
        service_provider: this.serviceProvider,
        data: [],
      };

      posicoes.forEach((mov: any, index: number) => {
        const from = this.getLocale(posicoes, index);
        const to = this.getLocaleTo(posicoes, index);
        responseObject.data.push({
          date: new Date(mov.Data).toLocaleString("pt-BR"),
          to,
          from,
          location: to,
          originalTitle: mov.Acao,
          details: mov.DetalhesFormatado.replace(/\n\r/g, " - "),
        });
      });

      responseObject.status =
        responseObject.data.length > 0
          ? this.setStatus(responseObject.data[0].originalTitle)
          : this.setStatus("", true);

      return responseObject;
    } catch (error) {
      throw new Error("Erro ao buscar dados de rastreamento");
    }
  }

  private getLocale(data: any[], index: number): string {
    if (index < 0 || index >= data.length) return "";

    for (let i = index + 1; i < data.length; i++) {
      if (data[i].DetalhesFormatado !== data[index].DetalhesFormatado) {
        return data[i].DetalhesFormatado.split("para")[1]?.trim() || "";
      }
    }

    return data[index].DetalhesFormatado.split("para")[1]?.trim() || "";
  }

  private getLocaleTo(data: any[], index: number): string {
    if (index < 0 || index >= data.length) return "";

    const match = data[index].DetalhesFormatado.match(
      /em\s+(.*?)\s+(para\s+(.*?))?$/
    );
    return match ? match[3] || match[1] : "";
  }
}
