/*
  # Add Geographic Network Data

  1. New Tables
    - `access_points`
      - `id` (uuid, primary key)
      - `name` (text) - Access point identifier
      - `location` (text) - Location description
      - `latitude` (double precision) - Geographic latitude
      - `longitude` (double precision) - Geographic longitude
      - `status` (text) - online/offline status
      - `uptime` (text) - Uptime percentage
      - `connected_users` (integer) - Number of connected users
      - `signal_strength` (integer) - Signal strength percentage
      - `bandwidth` (text) - Current bandwidth usage
      - `firmware_version` (text) - Firmware version
      - `created_at` (timestamp) - Creation timestamp
      - `updated_at` (timestamp) - Last update timestamp

    - `customers`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text, unique) - Customer email
      - `latitude` (double precision) - Customer location latitude
      - `longitude` (double precision) - Customer location longitude
      - `plan` (text) - Subscription plan
      - `status` (text) - Account status
      - `connected_ap_id` (uuid, foreign key) - Connected access point
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for super_admin and network_admin to manage data

  3. Indexes
    - Add spatial indexes for efficient geographic queries
    - Add status indexes for filtering
*/

-- Create access_points table
CREATE TABLE IF NOT EXISTS access_points (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'offline',
  uptime TEXT DEFAULT '0%',
  connected_users INTEGER DEFAULT 0,
  signal_strength INTEGER DEFAULT 0,
  bandwidth TEXT DEFAULT '0 MB/s',
  firmware_version TEXT DEFAULT 'v1.0.0',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  plan TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  connected_ap_id VARCHAR REFERENCES access_points(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_access_points_status ON access_points(status);
CREATE INDEX IF NOT EXISTS idx_access_points_location ON access_points(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_location ON customers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_customers_ap ON customers(connected_ap_id);

-- Enable Row Level Security
ALTER TABLE access_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Access Points Policies
CREATE POLICY "Authenticated users can view access points"
  ON access_points FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert access points"
  ON access_points FOR INSERT
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin')
  );

CREATE POLICY "Admins can update access points"
  ON access_points FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin')
  )
  WITH CHECK (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin')
  );

CREATE POLICY "Admins can delete access points"
  ON access_points FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin')
  );

-- Customers Policies
CREATE POLICY "Authenticated users can view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert customers"
  ON customers FOR INSERT
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin', 'billing_admin')
  );

CREATE POLICY "Admins can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin', 'billing_admin')
  )
  WITH CHECK (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin', 'billing_admin')
  );

CREATE POLICY "Admins can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'role' IN ('super_admin', 'network_admin')
  );

-- Insert sample data for demonstration
INSERT INTO access_points (name, location, latitude, longitude, status, uptime, connected_users, signal_strength, bandwidth, firmware_version)
VALUES
  ('AP-North-01', 'North Tower', 40.7589, -73.9851, 'online', '99.9%', 42, 85, '245 MB/s', 'v2.4.1'),
  ('AP-South-02', 'South Building', 40.7489, -73.9851, 'online', '98.5%', 38, 92, '198 MB/s', 'v2.4.1'),
  ('AP-East-03', 'East Wing', 40.7589, -73.9751, 'offline', '0%', 0, 0, '0 MB/s', 'v2.3.8'),
  ('AP-West-04', 'West Campus', 40.7489, -73.9951, 'online', '97.2%', 55, 78, '312 MB/s', 'v2.4.1'),
  ('AP-Central-05', 'Central Hub', 40.7539, -73.9801, 'online', '99.5%', 67, 90, '402 MB/s', 'v2.4.1')
ON CONFLICT (id) DO NOTHING;

-- Get IDs for customer sample data
DO $$
DECLARE
  ap_north_id VARCHAR;
  ap_south_id VARCHAR;
  ap_west_id VARCHAR;
  ap_central_id VARCHAR;
BEGIN
  SELECT id INTO ap_north_id FROM access_points WHERE name = 'AP-North-01' LIMIT 1;
  SELECT id INTO ap_south_id FROM access_points WHERE name = 'AP-South-02' LIMIT 1;
  SELECT id INTO ap_west_id FROM access_points WHERE name = 'AP-West-04' LIMIT 1;
  SELECT id INTO ap_central_id FROM access_points WHERE name = 'AP-Central-05' LIMIT 1;

  INSERT INTO customers (name, email, latitude, longitude, plan, status, connected_ap_id)
  VALUES
    ('John Smith', 'john.smith@example.com', 40.7594, -73.9855, 'Premium', 'active', ap_north_id),
    ('Sarah Johnson', 'sarah.johnson@example.com', 40.7592, -73.9848, 'Basic', 'active', ap_north_id),
    ('Mike Wilson', 'mike.wilson@example.com', 40.7485, -73.9855, 'Premium', 'suspended', ap_south_id),
    ('Emma Davis', 'emma.davis@example.com', 40.7487, -73.9847, 'Standard', 'active', ap_south_id),
    ('David Brown', 'david.brown@example.com', 40.7485, -73.9955, 'Premium', 'pending', ap_west_id),
    ('Lisa Anderson', 'lisa.anderson@example.com', 40.7545, -73.9805, 'Standard', 'active', ap_central_id),
    ('Tom Wilson', 'tom.wilson@example.com', 40.7541, -73.9798, 'Premium', 'active', ap_central_id),
    ('Amy Chen', 'amy.chen@example.com', 40.7492, -73.9950, 'Basic', 'active', ap_west_id)
  ON CONFLICT (email) DO NOTHING;
END $$;
