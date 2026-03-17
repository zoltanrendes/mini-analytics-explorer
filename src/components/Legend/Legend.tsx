import {Props} from './types';

export const Legend = ({ items }: Props) => {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {items.map((item) => (
        <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: item.color,
              borderRadius: "50%",
            }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};