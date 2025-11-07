import { type User, type InsertUser, type AccessPoint, type Customer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAccessPoints(): Promise<AccessPoint[]>;
  getCustomers(): Promise<Customer[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private accessPoints: AccessPoint[];
  private customers: Customer[];

  constructor() {
    this.users = new Map();

    this.accessPoints = [
      {
        id: randomUUID(),
        name: "AP-North-01",
        location: "North Tower",
        latitude: 40.7589,
        longitude: -73.9851,
        status: "online",
        uptime: "99.9%",
        connectedUsers: 42,
        signalStrength: 85,
        bandwidth: "245 MB/s",
        firmwareVersion: "v2.4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "AP-South-02",
        location: "South Building",
        latitude: 40.7489,
        longitude: -73.9851,
        status: "online",
        uptime: "98.5%",
        connectedUsers: 38,
        signalStrength: 92,
        bandwidth: "198 MB/s",
        firmwareVersion: "v2.4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "AP-East-03",
        location: "East Wing",
        latitude: 40.7589,
        longitude: -73.9751,
        status: "offline",
        uptime: "0%",
        connectedUsers: 0,
        signalStrength: 0,
        bandwidth: "0 MB/s",
        firmwareVersion: "v2.3.8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "AP-West-04",
        location: "West Campus",
        latitude: 40.7489,
        longitude: -73.9951,
        status: "online",
        uptime: "97.2%",
        connectedUsers: 55,
        signalStrength: 78,
        bandwidth: "312 MB/s",
        firmwareVersion: "v2.4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "AP-Central-05",
        location: "Central Hub",
        latitude: 40.7539,
        longitude: -73.9801,
        status: "online",
        uptime: "99.5%",
        connectedUsers: 67,
        signalStrength: 90,
        bandwidth: "402 MB/s",
        firmwareVersion: "v2.4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.customers = [
      {
        id: randomUUID(),
        name: "John Smith",
        email: "john.smith@example.com",
        latitude: 40.7594,
        longitude: -73.9855,
        plan: "Premium",
        status: "active",
        connectedApId: this.accessPoints[0].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        latitude: 40.7592,
        longitude: -73.9848,
        plan: "Basic",
        status: "active",
        connectedApId: this.accessPoints[0].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Mike Wilson",
        email: "mike.wilson@example.com",
        latitude: 40.7485,
        longitude: -73.9855,
        plan: "Premium",
        status: "suspended",
        connectedApId: this.accessPoints[1].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Emma Davis",
        email: "emma.davis@example.com",
        latitude: 40.7487,
        longitude: -73.9847,
        plan: "Standard",
        status: "active",
        connectedApId: this.accessPoints[1].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "David Brown",
        email: "david.brown@example.com",
        latitude: 40.7485,
        longitude: -73.9955,
        plan: "Premium",
        status: "pending",
        connectedApId: this.accessPoints[3].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        latitude: 40.7545,
        longitude: -73.9805,
        plan: "Standard",
        status: "active",
        connectedApId: this.accessPoints[4].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Tom Wilson",
        email: "tom.wilson@example.com",
        latitude: 40.7541,
        longitude: -73.9798,
        plan: "Premium",
        status: "active",
        connectedApId: this.accessPoints[4].id,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Amy Chen",
        email: "amy.chen@example.com",
        latitude: 40.7492,
        longitude: -73.9950,
        plan: "Basic",
        status: "active",
        connectedApId: this.accessPoints[3].id,
        createdAt: new Date(),
      },
    ];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAccessPoints(): Promise<AccessPoint[]> {
    return this.accessPoints;
  }

  async getCustomers(): Promise<Customer[]> {
    return this.customers;
  }
}

export const storage = new MemStorage();
