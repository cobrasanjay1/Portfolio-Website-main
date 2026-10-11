import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { LuCoffee } from "react-icons/lu";
import "./styles/BuyMeCoffee.css";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  theme?: { color: string };
  handler?: () => void;
  modal?: { ondismiss?: () => void };
}

const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const PAYMENT_LINK = import.meta.env.VITE_RAZORPAY_PAYMENT_LINK as string | undefined;

const PRESETS = [50, 100, 200];
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 50000;
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let checkoutLoader: Promise<boolean> | null = null;

const loadCheckout = (): Promise<boolean> => {
  if (window.Razorpay) return Promise.resolve(true);
  if (checkoutLoader) return checkoutLoader;
  checkoutLoader = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => {
      checkoutLoader = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });
  return checkoutLoader;
};

type Status = "idle" | "loading" | "thanks" | "error";

const BuyMeCoffee = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (!KEY_ID && !PAYMENT_LINK) {
    if (import.meta.env.DEV) {
      console.warn(
        "[BuyMeCoffee] Set VITE_RAZORPAY_KEY_ID (or VITE_RAZORPAY_PAYMENT_LINK) in .env to show the button."
      );
    }
    return null;
  }

  const finalAmount = custom ? Number(custom) : amount;
  const validAmount =
    Number.isInteger(finalAmount) &&
    finalAmount >= MIN_AMOUNT &&
    finalAmount <= MAX_AMOUNT;

  const pay = async () => {
    if (!validAmount) return;

    if (!KEY_ID && PAYMENT_LINK) {
      window.open(PAYMENT_LINK, "_blank", "noopener,noreferrer");
      return;
    }

    setStatus("loading");
    const loaded = await loadCheckout();
    if (!loaded || !window.Razorpay) {
      setStatus("error");
      return;
    }

    const rzp = new window.Razorpay({
      key: KEY_ID as string,
      amount: finalAmount * 100,
      currency: "INR",
      name: "Sanjay Vinod",
      description: "Buy me a coffee",
      theme: { color: "#c2a4ff" },
      handler: () => setStatus("thanks"),
      modal: {
        ondismiss: () => setStatus((s) => (s === "loading" ? "idle" : s)),
      },
    });
    rzp.open();
    setStatus("idle");
  };

  return (
    <div className="bmc" data-cursor="disable">
      <button
        type="button"
        className="bmc-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <LuCoffee /> Buy me a coffee
      </button>

      {open && (
        <div className="bmc-panel">
          {status === "thanks" ? (
            <p className="bmc-msg">Thank you! You just made my day. ☕</p>
          ) : (
            <>
              <div className="bmc-presets">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`bmc-chip ${!custom && amount === p ? "active" : ""}`}
                    onClick={() => {
                      setAmount(p);
                      setCustom("");
                    }}
                  >
                    ₹{p}
                  </button>
                ))}
                <input
                  className="bmc-custom"
                  type="number"
                  inputMode="numeric"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  placeholder="Other ₹"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  aria-label="Custom amount in rupees"
                />
              </div>
              <button
                type="button"
                className="bmc-pay"
                onClick={pay}
                disabled={!validAmount || status === "loading"}
              >
                {status === "loading"
                  ? "Opening…"
                  : validAmount
                  ? `Pay ₹${finalAmount} with Razorpay`
                  : `Enter ₹${MIN_AMOUNT}–₹${MAX_AMOUNT}`}
                <MdArrowOutward />
              </button>
              {status === "error" && (
                <p className="bmc-msg bmc-error">
                  Couldn't load the payment window. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyMeCoffee;
