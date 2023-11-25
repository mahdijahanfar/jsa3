import React from "react";
import Table from "./../../components/table/Table"
import Chart from "./../../components/chart/Chart"
import { Helmet } from "react-helmet";
export default function Index() {

    return (
        <>
            <Helmet>
                <title>
                    سیستم کشاورزی هوشمند | پیمایش لحظه ای
                </title>
            </Helmet>
            <Table />
            <Chart />
        </>
    )
}