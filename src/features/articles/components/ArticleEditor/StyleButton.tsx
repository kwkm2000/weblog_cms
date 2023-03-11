import React from "react";

interface Props {
  onToggle: (style: string) => void;
  label: string;
  style: string;
  isActive: boolean;
}

export default function StyleButton(props: Props) {
  const { onToggle, label, style } = props;
  const onClick = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onToggle(style);
    },
    [onToggle, style]
  );

  return <button onClick={onClick}>{label}</button>;
}
