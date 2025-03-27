import { Services } from "./Config/Services";
import { Tracking } from "./Methods/Tracking";

async function main() {
  // Configure o serviço de rastreamento
  Services.setServiceTracking("0002"); // ID do site de busca
  Services.setDebug(true);

  // Crie uma instância de Tracking e adicione os códigos de rastreamento
  const tracking = new Tracking();
  tracking.setCode("AC412492365BR");
  // OR
  // tracking.setCode("OBJETO1,OBJETO2");
  const services = Services.getServices();

  // Exiba os serviços no console
  console.log("Serviços disponíveis:");
  console.log(services);
  // Verifique se o serviço está configurado corretamente
  if (Services.success) {
    const result = await tracking.get();
    console.log("Tracking result:", JSON.stringify(result, null, 2));
  } else {
    console.error("Error:", Services.getMessageError());
  }
}

// Execute a função principal
main().catch((error) => {
  console.error("Unexpected error:", error);
});
