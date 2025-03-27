export class FormatResponse {
  public formatTracking: {
    code: string;
    status: string;
    service_provider: string;
    data: Array<{
      date?: string;
      to?: string;
      from?: string;
      location?: string;
      originalTitle?: string;
      details?: string;
    }>;
  };

  constructor(formatTracking: Partial<FormatResponse["formatTracking"]> = {}) {
    this.formatTracking = {
      code: "",
      status: "",
      service_provider: "",
      data: [],
      ...formatTracking,
    };
  }
}
