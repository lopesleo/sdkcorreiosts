import { FormatResponse } from "./FormatResponse";

export class Services {
  public static service: string;
  public static list: string[] = [];
  public static success: boolean = false;
  public static error: string = "";
  public static debug: boolean = false;

  public static getServices(): Record<string, string> {
    const services: Record<string, string> = {
      "0001": "MelhorRastreio",
      "0002": "EncomendaIo",
      "0003": "RastreadorDePacotes",
      "0004": "RastreamentoCorreio",
      "0005": "Muambator",
      "0006": "RastreioCorreios",
      "0007": "LinkCorreios",
    };

    return services;
  }

  public static getMessageError(): string {
    return this.error;
  }

  public static setServiceTracking(service: string): boolean {
    const services = this.getServices();

    if (services[service]) {
      this.success = true;
      return true;
    } else {
      this.success = false;
      this.error = "Service not found";
      return false;
    }
  }

  public static setDebug(debug: boolean): void {
    this.debug = debug;
  }

  public static showError(): void {
    console.error({
      success: this.success,
      message: this.error,
    });

    if (this.debug) {
      throw new Error(this.error);
    }
  }
}
