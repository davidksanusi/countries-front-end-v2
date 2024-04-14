"use client";
import emailjs from "@emailjs/browser";
import { Button, Form, Input, notification } from "antd";

function FeedbackForm() {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    console.log("Received values:", values);

    // Send email using EmailJS
    emailjs
      .send(
        "service_1u1f1ct",
        "template_kr3blfy",
        {
          name: values.name,
          email: values.email,
          body: values.feedback,
        },
        "vlhzK9iLZsYA0NIKy"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);

        api.open({
          message: "Email sent successfully",
        });
      })
      .catch((error) => {
        api.open({
          messages: "Something went wrong!",
        });

        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="w-[32rem] mx-auto p-5 mt-[40px] flex flex-col gap-[12px] bg-[#f7fafc] flex-1">
      {contextHolder}

      <p className="text-2xl font-bold text-[#0D141C] ">Leave feedback</p>
      <p className=" text-base text-[#0D141C] fon-normal">
        Your feedback is important to us and will help improve our product.
        Please share your thoughts, ideas, and suggestions.
      </p>
      <Form
        className="feedbackForm"
        name="feedbackForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Your name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input className="h-[56px]" placeholder="John Doe" />
        </Form.Item>
        <Form.Item
          label="Your email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input className="h-[56px]" placeholder="jane.doe@gmail.com" />
        </Form.Item>
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[{ required: true, message: "Please input your feedback!" }]}
        >
          <Input.TextArea
            style={{ height: 144 }}
            className="h-[144px]"
            placeholder="How can we help?"
          />
        </Form.Item>
        <Form.Item>
          <Button className="float-right" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FeedbackForm;
