/** @type {import('tailwindcss').Config} */
const primitiveColors = {
  gray: {
    50: "#f6f6f6",
    100: "#ebebeb",
    200: "#dedede",
    300: "#636363",
    400: "#404040",
    500: "#313131",
    600: "#212121",
    700: "#1d1d1d",
    800: "#171717",
    900: "#0a0a0a",
  },
  orange: {
    50: "#fce9e6",
    100: "#ffcbb8",
    200: "#ffa98b",
    300: "#ff885c",
    400: "#ff6d37",
    500: "#ff540a",
    600: "#f44d05",
    700: "#e64600",
    800: "#d93f00",
    900: "#c03000",
  },
  yellow: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  green: {
    50: "#dff6ed",
    100: "#b2e9d2",
    200: "#7adab5",
    300: "#1fcc98",
    400: "#00c082",
    500: "#00b46d",
    600: "#00a461",
    700: "#009254",
    800: "#008147",
    900: "#006130",
  },
  red: {
    50: "#ffe9ef",
    100: "#ffc7d4",
    200: "#ff8e9a",
    300: "#ff5b71",
    400: "#ff0d4c",
    500: "#ff0030",
    600: "#ff0030",
    700: "#ef002b",
    800: "#e20023",
    900: "#d20016",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
};

const semanticColors = {
  inherit: "inherit",
  transparent: "transparent",
  brand: {
    DEFAULT:
        process.env.NEXT_PUBLIC_PRESENTATION_TYPE === "Live"
            ? primitiveColors.orange[500]
            : primitiveColors.green[300],
  },
  state: {
    success: primitiveColors.green[700],
    error: primitiveColors.red[900],
    warning: primitiveColors.yellow[500],
    info: primitiveColors.blue[500],
    focus: primitiveColors.orange[500],
  },
  exchange: {
    increase: primitiveColors.green[300],
    decrease: primitiveColors.red[300],
    buy: {
      light: primitiveColors.green[200],
      DEFAULT: primitiveColors.green[300],
      dark: primitiveColors.green[400],
    },
    sell: {
      light: primitiveColors.red[200],
      DEFAULT: primitiveColors.red[300],
      dark: primitiveColors.red[400],
    },
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      tabletLg: "840px",
      desktop: "1200px",
    },
    colors: {
      ...primitiveColors,
      ...semanticColors,
    },
    spacing: {
      0: "0",
      1: "0.4rem",
      2: "0.8rem",
      3: "1.2rem",
      4: "1.6rem",
      5: "2.0rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4.0rem",
      128: "512.0rem",
    },
    fontFamily: {
      sans: ["var(--font-dm-sans)"],
      mono: ["var(--font-dm-mono)"],
    },
    textColor: ({ theme }) => ({
      ...semanticColors,
      primary: {
        DEFAULT: theme("colors.gray.50"),
        reverse: theme("colors.gray.900"),
      },
      secondary: theme("colors.gray.300"),
      hover: theme("colors.gray.200"),
    }),
    backgroundColor: ({ theme }) => ({
      ...semanticColors,
      global: theme("colors.gray.900"),
      skeleton: theme("colors.gray.500"),
      backdrop: theme("colors.gray.900"),
      section: {
        DEFAULT: theme("colors.blue.300"),
        hover: theme("colors.gray.500"),
      },
      btn: {
        DEFAULT: theme("colors.gray.600"),
        hover: theme("colors.gray.500"),
        active: theme("colors.gray.700"),
        focus: theme("colors.gray.600"),
        disabled: theme("colors.gray.600"),
        selected: theme("colors.gray.500"),
      },
      input: {
        DEFAULT: theme("colors.gray.600"),
        hover: theme("colors.gray.500"),
        active: theme("colors.gray.600"),
        focus: theme("colors.gray.600"),
      },
      toast: {
        DEFAULT: theme("colors.gray.50"),
      },
    }),
    borderColor: ({ theme }) => ({
      ...semanticColors,
      input: theme("colors.gray.600"),
    }),
    borderRadius: ({ theme }) => ({
      min: theme("spacing.1"),
      DEFAULT: theme("spacing.2"),
      full: theme("spacing.128"),
    }),
    fontSize: {
      xs: "0.9rem",
      sm: "1.2rem",
      base: "1.4rem",
      md: "1.6rem",
      lg: "2.0rem",
      xl: "2.4rem",
      "2xl": "2.8rem",
      "3xl": "3.2rem",
    },
    extend: {
      maxWidth: {
        "8xl": "144rem",
      },
      borderColor: ({ theme }) => ({
        divider: theme("colors.gray.500"),
      }),
      gridTemplateColumns: {
        main: "1fr min(50%, 80rem) 1fr",
        aside: "min(30%, 24rem) min(60%, 54rem)",
        wallet: "30% auto",
      },
    },
  },
  plugins: [],
};
