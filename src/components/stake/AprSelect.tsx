"use client";
import { aprSelectAtom } from "@/data/atoms";
import classNames from "classnames";
import { useAtom, useSetAtom } from "jotai";

export default function AprSelect() {
  const [selected, setApr] = useAtom(aprSelectAtom);
  return (
    <div className="stats stats-vertical md:stats-horizontal border-2 border-primary">
      <button
        className={classNames(
          "stat hover:bg-black transition-all duration-300 group",
          selected === 18 ? "bg-black" : ""
        )}
        onClick={() => setApr(18)}
      >
        <p className="stat-title">APR</p>
        <p
          className={classNames(
            selected === 18 ? "text-primary" : "",
            "stat-value group-hover:text-primary"
          )}
        >
          17.99%
        </p>
        <p className="stat-desc">2 week lock</p>
      </button>
      <button
        className={classNames(
          "stat hover:bg-black transition-all duration-300 group",
          selected === 20 ? "bg-black" : ""
        )}
        onClick={() => setApr(20)}
      >
        <p className="stat-title">APR</p>
        <p
          className={classNames(
            selected === 20 ? "text-primary" : "",
            "stat-value group-hover:text-primary"
          )}
        >
          20.00%
        </p>
        <p className="stat-desc">4 week lock</p>
      </button>
      <button
        className={classNames(
          "stat hover:bg-black transition-all duration-300 group",
          selected === 25 ? "bg-black" : ""
        )}
        onClick={() => setApr(25)}
      >
        <p className="stat-title">APR</p>
        <p
          className={classNames(
            selected === 25 ? "text-primary" : "",
            "stat-value group-hover:text-primary"
          )}
        >
          25.00%
        </p>
        <p className="stat-desc">12 week lock</p>
      </button>
    </div>
  );
}
