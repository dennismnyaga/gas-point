// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAnalytics, selectAllAnalytics } from "../features/analytics/analyticsSlice";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {
    const dispatch = useAppDispatch();
    const all_data = useAppSelector(selectAllAnalytics);
    
    const [filteredData, setFilteredData] = useState([]);
    const [timeRange, setTimeRange] = useState("1_week");

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    useEffect(() => {
        if (all_data.length > 0) {
            filterData(timeRange);
        }
    }, [all_data, timeRange]);

    // Function to filter data based on the selected time range
    const filterData = (range) => {
        const today = new Date();
        let startDate = new Date();

        if (range === "1_week") startDate.setDate(today.getDate() - 7);
        else if (range === "2_weeks") startDate.setDate(today.getDate() - 14);
        else if (range === "3_weeks") startDate.setDate(today.getDate() - 21);
        else if (range === "1_month") startDate.setMonth(today.getMonth() - 1);
        else if (range === "2_months") startDate.setMonth(today.getMonth() - 2);

        const filtered = all_data.filter(item => {
            const fromDate = new Date(item.from_date);
            return fromDate >= startDate && fromDate <= today;
        });

        setFilteredData(filtered);
    };

    // Aggregate sales per shop
    const aggregateSales = () => {
        const salesMap = {};

        filteredData.forEach(item => {
            const shopName = item.shop.name;
            salesMap[shopName] = (salesMap[shopName] || 0) + item.quantity;
        });

        return salesMap;
    };

    const salesData = aggregateSales();
    const shopNames = Object.keys(salesData);
    const shopSales = Object.values(salesData);

    // Identify best and worst performing shops
    const maxSales = Math.max(...shopSales);
    const minSales = Math.min(...shopSales);
    const bestShop = shopNames[shopSales.indexOf(maxSales)];
    const worstShop = shopNames[shopSales.indexOf(minSales)];

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>

            <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)} 
                className="p-2 border rounded mb-4"
            >
                <option value="1_week">Last 1 Week</option>
                <option value="2_weeks">Last 2 Weeks</option>
                <option value="3_weeks">Last 3 Weeks</option>
                <option value="1_month">Last 1 Month</option>
                <option value="2_months">Last 2 Months</option>
            </select>

            <h3 className="text-lg font-semibold">Best Shop: {bestShop} (Sales: {maxSales})</h3>
            <h3 className="text-lg font-semibold">Worst Shop: {worstShop} (Sales: {minSales})</h3>

            <div className="mt-5" style={{ height: "400px" }}>
                <Bar 
                    data={{
                        labels: shopNames,
                        datasets: [{
                            label: "Total Sales",
                            data: shopSales,
                            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                        }]
                    }} 
                    options={{ responsive: true, maintainAspectRatio: false }}
                />
            </div>
        </div>
    );
};

export default Analytics;
