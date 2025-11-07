import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/access-points", async (req, res) => {
    try {
      const accessPoints = await storage.getAccessPoints();
      res.json(accessPoints);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch access points" });
    }
  });

  app.get("/api/customers", async (req, res) => {
    try {
      const customers = await storage.getCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
