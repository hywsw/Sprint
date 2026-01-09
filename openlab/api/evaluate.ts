// @ts-nocheck
import { evaluateText } from "./_lib/evaluator";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Method not allowed" }));
    return;
  }

  try {
    const { criteria, jobDescription, resumeText } = req.body || {};

    if (!resumeText) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: "Missing resumeText" }));
      return;
    }

    const evalRes = await evaluateText({ criteria: criteria || "", jobDescription: jobDescription || "", resumeText });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, ...evalRes }));
  } catch (err: any) {
    console.error("evaluate error", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Internal server error" }));
  }
}
