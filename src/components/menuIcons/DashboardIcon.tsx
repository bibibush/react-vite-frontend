interface DashboardProps {
  color: string;
}

function DashboardIcon({ color }: DashboardProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3Z"
        fill={color}
      />
    </svg>
  );
}

export default DashboardIcon;
