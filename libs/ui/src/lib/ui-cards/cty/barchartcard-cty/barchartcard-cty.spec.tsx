import React from "react";
import { render } from "@testing-library/react";

import { BarchartcardCty } from "./barchartcard-cty";

describe("Component Barchartcard for counties", () => {

    it("should render successfull for countyId 1", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={1} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 16", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={16} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render successfull for countyId 17", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={17} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 19", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={19} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 64", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={64} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 66", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={66} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 119", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={119} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 181", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={181} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 225", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={225} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 320", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={320} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 326", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={326} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 344", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={344} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 352", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={352} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 365", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={365} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 379", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={379} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

    it("should render successfull for countyId 402", () => {
        const { baseElement } = render(
            <BarchartcardCty countyId={402} panelTheme={null} key={0} />
        );
        expect(baseElement).toBeTruthy();
    });

});
