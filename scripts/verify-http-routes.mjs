/**
 * HTTP Route Verification Script
 * Validates that all authentication, onboarding, patient, doctor, and pharmacist
 * routes respond with HTTP 200 OK and render valid HTML on http://localhost:3000.
 */

import assert from "node:assert/strict";

const BASE_URL = "http://localhost:3000";

const ROUTES_TO_TEST = [
  {
    path: "/auth/role",
    description: "Role selection page (Patient, Pharmacist, Doctor)",
  },
  {
    path: "/auth/register?role=patient",
    description: "Patient phone registration entry",
  },
  {
    path: "/auth/register?role=doctor",
    description: "Doctor phone registration entry",
  },
  {
    path: "/auth/register?role=pharmacist",
    description: "Pharmacist phone registration entry",
  },
  {
    path: "/auth/verify?role=patient&phone=01099887766",
    description: "Simulated OTP verification screen",
  },
  {
    path: "/auth/register/info?role=patient&phone=01099887766",
    description: "Patient personal information onboarding form",
  },
  {
    path: "/auth/register/info?role=doctor&phone=01233445566",
    description: "Doctor clinical onboarding and document upload form",
  },
  {
    path: "/auth/register/info?role=pharmacist&phone=01555555555",
    description: "Pharmacist intentional specification status notice",
  },
  {
    path: "/auth/login",
    description: "Unified login page with Demo Sandbox toggle and shortcuts",
  },
  {
    path: "/patient",
    description: "Patient portal dashboard",
  },
  {
    path: "/patient/profile",
    description: "Patient profile screen",
  },
  {
    path: "/patient/medical-info",
    description: "Patient medical info screen",
  },
  {
    path: "/patient/records",
    description: "Patient medical records screen",
  },
  {
    path: "/doctor",
    description: "Doctor portal clinical queue",
  },
  {
    path: "/doctor/find-patient",
    description: "Doctor patient lookup directory",
  },
  {
    path: "/doctor/access-requests",
    description: "Doctor electronic access requests dispatch",
  },
  {
    path: "/pharmacist",
    description: "Pharmacist workspace specification notice",
  },
];

console.log("\n========================================================");
console.log(" PULSEID HTTP ROUTE & COMPONENT VERIFICATION ");
console.log("========================================================\n");

let passed = 0;
let failed = 0;

for (const route of ROUTES_TO_TEST) {
  try {
    const res = await fetch(`${BASE_URL}${route.path}`);
    assert.equal(res.status, 200, `Expected status 200, got ${res.status}`);
    const text = await res.text();
    assert.ok(
      text.includes("<!DOCTYPE html>"),
      `Expected response to be valid HTML document`
    );
    assert.ok(
      text.includes("PulseID") || text.includes("pulseid"),
      `Expected HTML to include PulseID application context`
    );
    console.log(`  ✓ [200 OK] ${route.path.padEnd(55)} -> ${route.description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL]   ${route.path} -> ${err.message}`);
    failed++;
  }
}

console.log("\n========================================================");
console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("========================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
