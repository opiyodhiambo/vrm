const paths = {
  structure: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h6',
  plan: 'M4 4h16v16H4zM4 10h8M12 10v10M12 14h8',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  interior: 'M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 17v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4zM5 17v3M19 17v3',
  leaf: 'M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19l8-8',
  road: 'M8 3 5 21M16 3l3 18M12 4v3M12 11v3M12 18v3',
  layers: 'm12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4',
  hardhat: 'M3 18h18M5 18v-2a7 7 0 0 1 14 0v2M12 6v5M9 8v3M15 8v3',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6 6 18',
}

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.structure} />
    </svg>
  )
}
