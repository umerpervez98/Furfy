"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/Checkout/index.checkout";
import { Button } from "../index.shared";
import { type ReactNode } from "react";

type FormButtonWithStatusProps = {
  children: ReactNode;
  disabled?: boolean;
};

const FormButtonWithStatus = ({
  children,
  disabled,
}: FormButtonWithStatusProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      disabled={disabled}
      style={{ width: "15rem" }}
    >
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export default FormButtonWithStatus;
