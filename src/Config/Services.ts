import { MelhorRastreio } from "../Services/MelhorRastreio";
import { RastreadorDePacotes } from "../Services/RastreadorDePacotes";

export class Services {
  public static service: string;
  public static list: string[] = [];
  public static success: boolean = false;
  public static error: string = "";
  public static debug: boolean = false;

  public static getServices(): Record<string, string> {
    const services: Record<string, string> = {
      "0001": "MelhorRastreio",
      "0002": "RastreadorDePacotes",
      "0003": "RastreamentoCorreio",
      "0004": "Muambator",
      "0005": "RastreioCorreios",
      "0006": "LinkCorreios",
    };

    return services;
  }

  public static serviceRegistry: Record<string, any> = {
    MelhorRastreio: MelhorRastreio,
    RastreadorDePacotes: RastreadorDePacotes,
    // Adicione outros serviços aqui conforme necessário
  };

  public static getMessageError(): string {
    return this.error;
  }

  public static setServiceTracking(service: string): boolean {
    const services = this.getServices();

    if (services[service]) {
      this.service = services[service];
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
