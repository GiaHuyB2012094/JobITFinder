
export const regionMinimumWage = {
    I : 4680000,
    II : 4160000,
    III: 3640000,
    IV: 3250000,
}

export const basicWage = 1800000;

export const personalFamilyReduceWage = 11000000;

export const dependentWage = 4400000;

export const bhxh = 0.08;
export const bhyt = 0.015;
export const bhtn = 0.01;

export const calculateEarningPersonalGross = (val) => {
    let result = 0; 
    if (val <= 5000000) {
        result = val * 0.05;
    }
    if (val > 5000000 && val <= 10000000) {
        result = val * 0.1 - 250000;
    }
    if (val > 10000000 && val <= 18000000) {
        result = val * 0.15 - 750000;
    }
    if (val > 18000000 && val <= 32000000) {
        result = val * 0.2 - 1650000;
    }
    if (val > 32000000 && val <= 52000000) {
        result = val * 0.25 - 3250000;
    }
    if (val > 52000000 && val <= 80000000) {
        result = val * 0.3 - 5850000;
    }
    if (val > 80000000) {
        result = val * 0.35 - 9850000;
    }
    return result;
}

export const calculateEarningPersonalNet = (val) => {
    let result = 0; 
    if (val <= 4750000) {
        result = val / 0.95;
    }
    if (val > 4750000 && val <= 9250000) {
        result = (val - 250000) / 0.9;
    }
    if (val > 9250000 && val <= 16050000) {
        result = (val - 750000) / 0.85;
    }
    if (val > 16050000 && val <= 27250000) {
        result = (val - 1650000) / 0.8;
    }
    if (val > 27250000 && val <= 42250000) {
        result = (val - 3250000) / 0.75;
    }
    if (val > 42250000 && val <= 61850000) {
        result = (val - 5850000) / 0.7;
    }
    if (val > 61850000) {
        result = (val - 9850000) / 0.65;
    }
    return result;
}