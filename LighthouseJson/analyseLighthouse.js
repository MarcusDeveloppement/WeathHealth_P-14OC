import fs from "fs/promises";
import path from "path";
import process from "process";

// Assurez-vous que le chemin vers votre fichier rapport Lighthouse JSON est correct
const rapportPath = path.resolve(
  process.cwd(),
  "./LighthouseJson/rapport-lighthouse-form-react.json"
);

const analyseLighthouseData = async () => {
  try {
    const data = await fs.readFile(rapportPath, "utf8");
    const rapport = JSON.parse(data);

    // Performance score
    const scorePerformance = rapport.categories.performance.score * 100;
    console.log(`Score de Performance: ${scorePerformance}`);

    // Temps de chargement des pages
    const firstContentfulPaint =
      rapport.audits["first-contentful-paint"].displayValue;
    const speedIndex = rapport.audits["speed-index"].displayValue;
    const largestContentfulPaint =
      rapport.audits["largest-contentful-paint"].displayValue;
    const timeToInteractive = rapport.audits["interactive"].displayValue;

    console.log(`First Contentful Paint: ${firstContentfulPaint}`);
    console.log(`Speed Index: ${speedIndex}`);
    console.log(`Largest Contentful Paint: ${largestContentfulPaint}`);
    console.log(`Time to Interactive: ${timeToInteractive}`);

    // Appels réseau
    const networkRequests = rapport.audits["network-requests"].details.items;
    console.log(`Nombre d'appels réseau: ${networkRequests.length}`);
    networkRequests.forEach((request, index) => {
      console.log(`Appel réseau ${index + 1}:`);
      console.log(`  URL: ${request.url}`);
      console.log(`  Type de ressource: ${request.resourceType}`);
      console.log(`  Taille de la réponse: ${request.transferSize}`);
      console.log(`  Temps de fin: ${request.endTime}`);
      console.log(`  Statut HTTP: ${request.statusCode}`);
    });
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier:", err);
  }
};

analyseLighthouseData();
