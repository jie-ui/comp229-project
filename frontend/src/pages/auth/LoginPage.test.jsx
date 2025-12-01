// src/pages/auth/LoginPage.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "./LoginPage";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// --------- mock loginApi ----------
vi.mock("../../api/authApi", () => ({
  loginApi: vi.fn(),
}));
import { loginApi } from "../../api/authApi";

// --------- mock useNavigate ----------
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const theme = createTheme();

function renderWithProviders(ui, mockAuth) {
  return render(
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={mockAuth}>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

describe("LoginPage simple test", () => {
  it("renders and submits", async () => {
    const mockLoginLocal = vi.fn();

    const mockAuth = {
      user: null,
      loginLocal: mockLoginLocal,
      logout: vi.fn(),
    };

    loginApi.mockResolvedValue({
      token: "123",
      user: { id: 1, email: "admin@example.com" },
    });

    renderWithProviders(<LoginPage />, mockAuth);

fireEvent.change(
  screen.getByRole("textbox", { name: /email/i }),
  { target: { value: "admin@example.com" } }
);

fireEvent.change(
  screen.getByLabelText(/password/i),
  { target: { value: "password123" } }
);



    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginApi).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
      });
    });

    expect(mockLoginLocal).toHaveBeenCalledWith(
      "123",
      { id: 1, email: "admin@example.com" }
    );

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });
});
