import { Services } from "../Config/Services";
export class Tracking {
  private code: string | null = null;

  setCode(code: string): void {
    if (this.code === null) {
      this.code = code;
    } else {
      this.code += "," + code;
    }
  }

  async get(): Promise<any> {
    try {
      if (!Services.success) return false;
      if (!this.code) return false;

      const serviceName = Services.service;
      const ServiceClass = (Services as any)[serviceName];

      if (!ServiceClass) return false;
      const serviceInstance = new ServiceClass();

      if (typeof serviceInstance.tracking !== "function") return false;

      return await serviceInstance.tracking(this.code);
    } catch (error) {
      Services.success = false;
      Services.error = (error as Error).message;

      if (Services.debug) {
        Services.showError();
      }

      return false;
    }
  }
}
