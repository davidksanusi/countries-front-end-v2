"use client";

import { domain } from "@/lib/utils";
import { Input, notification } from "antd";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [api, contextHolder] = notification.useNotification();

  async function onSubmit() {
    if (!email || !email.includes("@")) {
      return;
    }

    // send post request to backend
    const response = await fetch(
      "https://countries-backend-y8w2.onrender.com/api/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, domain }),
      }
    );

    if (!response.ok) {
      api.open({
        message: "Failed to subscribe!",
      });
      return;
    }

    const data = await response.json();

    console.log(data);
    if (data[1] === 201) {
      api.open({
        message: data[0].message,
      });
    } else {
      api.open({
        message: data[0]?.error || "Something went wrong!",
      });
    }
  }

  return (
    <div className="w-full md:w-[32rem] p-5 mt-[40px] flex flex-col gap-[15px]  ">
      {contextHolder}
      <p className="text-2xl font-bold text-[#0D141C] ">
        Get the latest news and updates from our community
      </p>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#E8EDF2] rounded-md h-[56px]"
        placeholder="Enter your email"
        variant="filled"
        suffix={
          <ArrowRight className="size-6 cursor-pointer" onClick={onSubmit} />
        }
      />
      <p className="text-[#4F7596] text-sm font-normal">
        By entering your email, you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  );
}

export default NewsletterForm;
