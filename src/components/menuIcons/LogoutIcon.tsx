function LogoutIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.5287 17.457V19.2009C14.5287 19.7532 14.081 20.2009 13.5287 20.2009H4.45557C3.90328 20.2009 3.45557 19.7532 3.45557 19.2009V4.59113C3.45557 4.03884 3.90328 3.59113 4.45557 3.59113H13.5287C14.081 3.59113 14.5287 4.03884 14.5287 4.59113V6.335"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.05782 11.8959H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7743 8.37805L21 11.896L16.7743 15.414"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LogoutIcon;
