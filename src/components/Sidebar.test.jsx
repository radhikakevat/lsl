// Sidebar.test.jsx
import React from "react";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import Sidebar from "./Sidebar";

// Mock Icon component since it’s not essential to logic (and to avoid importing MUI icons)
vi.mock("./ui/Icon", () => ({
  default: ({ name }) => <div data-testid={`icon-${name}`} />,
}));

describe("Sidebar Component", () => {
  const onSectionChange = vi.fn();

  beforeEach(() => {
    onSectionChange.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders collapsed by default", () => {
    const { container } = render(
      <Sidebar userRole="admin" userName="John Doe" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    // Only icons should be visible, no text
    expect(within(container).queryByText("Dashboard")).not.toBeInTheDocument();
    expect(within(container).getByTestId("icon-dashboard")).toBeInTheDocument();
  });

  test("expands on mouse enter and collapses on mouse leave", () => {
    const { container } = render(
      <Sidebar userRole="admin" userName="John Doe" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement; // parent div with mouse events

    // Expand
    fireEvent.mouseEnter(sidebar);
    expect(within(container).getByText("Dashboard")).toBeInTheDocument();

    // Collapse
    fireEvent.mouseLeave(sidebar);
    expect(within(container).queryByText("Dashboard")).not.toBeInTheDocument();
  });

  test("shows user info when expanded", () => {
    const { container } = render(
      <Sidebar userRole="admin" userName="John Doe" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement;

    fireEvent.mouseEnter(sidebar);
    expect(within(container).getByText("John Doe")).toBeInTheDocument();
    expect(within(container).getByText("Administrator")).toBeInTheDocument();
  });

  test("calls onSectionChange when a section is clicked", () => {
    const { container } = render(
      <Sidebar userRole="admin" userName="John Doe" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement;
    fireEvent.mouseEnter(sidebar);

    fireEvent.click(within(container).getByText("Employees"));
    expect(onSectionChange).toHaveBeenCalledWith("employees");
  });

  test("applies active styles for active section", () => {
    const { container } = render(
      <Sidebar userRole="admin" userName="John Doe" activeSection="employees" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement;
    fireEvent.mouseEnter(sidebar);

    const employeesSection = within(container).getByText("Employees").parentElement;
    expect(employeesSection).toHaveClass("bg-gray-100 text-sky-700");
  });

  test("hides restricted sections for payroll_manager", () => {
    const { container } = render(
      <Sidebar userRole="payroll_manager" userName="Jane" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement;
    fireEvent.mouseEnter(sidebar);
    expect(within(nav).queryByText("LSL Rules Engine")).not.toBeInTheDocument();
  });

  test("hides more restricted sections for payroll_officer", () => {
    const { container } = render(
      <Sidebar userRole="payroll_officer" userName="Sam" activeSection="dashboard" onSectionChange={onSectionChange} />
    );
    const nav = within(container).getByRole("navigation");
    const sidebar = nav.parentElement;
    fireEvent.mouseEnter(sidebar);
    expect(within(nav).queryByText("LSL Rules Engine")).not.toBeInTheDocument();
    // "calculations" is not part of UI now, but test future-proof logic
    expect(within(nav).queryByText("Calculations")).not.toBeInTheDocument();
  });
});
