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
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z',
  mail: 'M4 5h16v14H4zM4 7l8 6 8-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v5h4v-5h3l1-4h-4V8z',
  instagram: 'M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 7h.01',
  linkedin: 'M4 9h4v11H4zM6 4.5v.01M10 9h4v2c.8-1.4 2.2-2.2 4-2.2 2.4 0 3 1.6 3 4V20h-4v-6c0-1.2-.4-2-1.600-2-1.300 0-2.400.9-2.400 2.400V20h-3z',
  x: 'M4 4l16 16M20 4 4 20',
  chat: 'M4 5h16v11h-8l-5 4v-4H4zM8 9h8M8 12h5',
  document: 'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6',
  pen: 'M4 20h16M5 16 15 6l3 3L8 19H5zM13 8l3 3',
  key: 'M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 11l9 9M16 16l2.5-2.5',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01M12 3v3M21 12h-3',
  whatsapp: 'M3 21l1.7-5A9 9 0 1 1 8 19.3zM9 8.6c0 3.5 3 6.4 6.4 6.4l1.3-1.5-2.4-1.2-1 .9a5 5 0 0 1-2.2-2.2l.9-1-1.2-2.4z',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  'chevron-down': 'm6 9 6 6 6-6',
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
