type TMask = {
  children: React.ReactNode;
  shouldDisplay?: boolean;
  className?: string;
};

const Mask = ({ shouldDisplay, children, className }: TMask) => {
  return (
    <div
      className={className || ""}
      style={{
        display: shouldDisplay ? "flex" : "none",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {children}
    </div>
  );
};

export default Mask;
