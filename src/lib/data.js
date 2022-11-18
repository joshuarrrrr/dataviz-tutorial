import csv from "../assets/co2.csv?raw"
import * as d3 from "d3"

export const co2Data = d3.csvParse(csv, d3.autoType);