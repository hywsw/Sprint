export default function handler(req: any, res: any) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: false, error: "Upload endpoint disabled" }));
} 
