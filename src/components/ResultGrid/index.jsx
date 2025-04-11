import React, { useEffect, useMemo, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useResult } from "../../context/ResultContext";
import { Box, CircularProgress } from "@mui/material";
import RangeSlider from "../inputs/price-input";
import "../../index.css";

DataTable.use(DT);

const monthsShort = {
  "01": "січ.",
  "02": "лют.",
  "03": "бер.",
  "04": "квіт.",
  "05": "трав.",
  "06": "черв.",
  "07": "лип.",
  "08": "серп.",
  "09": "вер.",
  10: "жовт.",
  11: "лист.",
  12: "груд.",
};

const formatDateDisplay = (dateString) => {
  if (!dateString) return "";
  const [datePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${parseInt(day, 10)} ${monthsShort[month]} ${year}`;
};

const formatPrice = (price) => {
  if (!price) return "0,00";
  return Number(price).toFixed(2).replace(".", ",");
};

const ResultGrid = () => {
  const { results, loading } = useResult();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (!results || results.length === 0) return;

    const prices = results.map((item) => Math.floor(item.costs));
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
    setFilteredResults(results);
  }, [results]);

  const handleSliderChange = ([min, max]) => {
    setPriceRange([min, max]);
    const filtered = results.filter(
      (item) => item.costs >= min && item.costs <= max
    );
    setFilteredResults(filtered);
  };

  const columns = useMemo(
    () => [
      { title: "Товар", data: "tovar_name", className: "product-column" },
      { title: "Товар 1С", data: "name_tovar_1C", className: "product-1c-column" },
      { title: "Постачальник", data: "name", className: "supplier-column" },
      { title: "Вартість (₴)", data: "costs", className: "price-column" },
      { title: "Вартість з ПДВ (₴)", data: "costs_NDS", className: "price-column" },
      {
        title: "Дата приходу",
        data: "date_prihod",
        render: (data, type) => {
          if (type === "display") return formatDateDisplay(data);
          return data ? new Date(data.split(" ")[0]).getTime() : 0;
        },
        type: "num",
      },
    ],
    []
  );

  const dataWithIndex = useMemo(() => {
    return (filteredResults || []).map((item) => ({
      ...item,
      costs: formatPrice(item.costs),
      costs_NDS: formatPrice(item.costs_NDS),
    }));
  }, [filteredResults]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          gap: "30px",
        }}
      >
        <CircularProgress />
        <p>
          ШІ думає над відповіддю 🤖 Це може зайняти ще кілька секунд. Дякуємо
          за очікування
        </p>
      </Box>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Введіть пошуковий запит.
      </div>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {minPrice !== maxPrice && maxPrice !== 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <RangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            value={priceRange}
            onChange={handleSliderChange}
          />
        </Box>
      )}

      <DataTable
        data={dataWithIndex}
        columns={columns}
        className="display"
        theme="dark"
        options={{
          dom: 'lrtip',
          order: [[5, "desc"]],
          language: {
            search: "Пошук:",
            zeroRecords: "Нічого не знайдено. Спробуйте змінити запит.",
            lengthMenu: "Показати _MENU_ записів на сторінку",
            info: "Показано сторінку _PAGE_ з _PAGES_",
            infoEmpty: "Немає записів для відображення",
            infoFiltered: "(відфільтровано з _MAX_ записів)",
          },
        }}
      >
        <thead>
          <tr>
            <th>Товар</th>
            <th>Товар 1С</th>
            <th>Постачальник</th>
            <th>Вартість (₴)</th>
            <th>Вартість з ПДВ (₴)</th>
            <th>Дата приходу</th>
          </tr>
        </thead>
      </DataTable>
    </Box>
  );
};

export default ResultGrid;
