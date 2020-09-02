import fb from './services/Firebase';

export const SCROLL_TO_SECTION = (id: string) => {
    const el: HTMLElement = document.getElementById(id);

    if (el) {
        window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth',
        });
    }
};

export const GET_FIREBASE_DATA = async () => {
    return new Promise((res, rej) => {
        const database = fb.database();
        database
            .ref('/')
            .once('value')
            .then((snapshot) => {
                res(snapshot.val());
            });
    });
};

export const NUMBER_FORMAT_FUNCTION = {
    numberWithCommas: (x) => {
        const s = '.';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
    },
    currencyNumber: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === '£-'
            ? 'N/A'
            : (x < 0 ? '-' : '') +
                  symbol +
                  Math.abs(x)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    decimal: (x, decimalPoints) => {
        return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')).toFixed(decimalPoints);
    },
    percent: (x) => {
        x = x * 100;
        return x.toFixed(x < 1 ? 2 : x < 10 ? 1 : 0) + '%';
    },
    seCurrency: (x, symbol) => {
        x = parseInt(x).toFixed(0);
        return x === '£-'
            ? 'N/A'
            : (x < 0 ? '-' : '+') +
                  symbol +
                  Math.abs(x)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    reverseCurrencyNumber: function (x, symbol) {
        x = parseInt(x).toFixed(0);
        return (
            Math.abs(x)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + symbol
        );
    },
    addPostFix: (labelValue: number, decimalPlaces: number, label: string) => {
        return Math.abs(Number(labelValue)) >= 1.0e9
            ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(decimalPlaces) + label
            : // Six Zeroes for Millions
            Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(decimalPlaces) + label
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
            ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(decimalPlaces) + label
            : Math.abs(Number(labelValue));
    },
};
