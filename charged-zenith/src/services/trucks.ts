export interface GalleryItem {
  url: string;
  type: 'image';
  label: string;
}

export interface Truck {
  id: string;
  name: string;
  brand: string;
  category: 'light' | 'medium' | 'heavy' | 'dump';
  capacity: string;
  engine: string;
  price: string;
  image: string;
  engineImage: string;
  gallery: GalleryItem[];
  description: string;
  longDescription: string;
  specs: Record<string, string>;
  detailedSpecs: {
    performance: Record<string, string>;
    dimensions: Record<string, string>;
    capacities: Record<string, string>;
  };
  colors: { name: string; hex: string }[];
}

export const mockTrucks: Truck[] = [
  {
    id: 'forland-l2',
    name: 'Forland L2 Light Duty',
    brand: 'Forland',
    category: 'light',
    capacity: '2.5 Tons',
    engine: '2.8L Isuzu technology',
    price: 'OMR 8,500',
    image: '/light.png',
    engineImage: '/hero-silver.png',
    gallery: [
      { url: '/light.png', type: 'image', label: 'EXTERIOR HERO' },
      { url: '/hero-silver.png', type: 'image', label: 'CHASSIS DETAIL' },
      { url: '/light.png', type: 'image', label: 'FRONT GRILL' },
      { url: '/truck_showcase.png', type: 'image', label: 'COCKPIT VIEW' },
      { url: '/hero-silver.png', type: 'image', label: 'WHEEL ASSEMBLY' },
      { url: '/light.png', type: 'image', label: 'REAR PROFILE' },
      { url: '/truck_showcase.png', type: 'image', label: 'INTERIOR SPACE' },
      { url: '/hero-silver.png', type: 'image', label: 'ENGINE BLOCK' },
      { url: '/light.png', type: 'image', label: 'HEADLIGHT TECH' },
      { url: '/truck_showcase.png', type: 'image', label: 'LOADING AREA' },
      { url: '/hero-silver.png', type: 'image', label: 'DOOR SEAL' }
    ],
    description: 'Perfect for urban deliveries and narrow streets of Muscat. Proven Isuzu technology provides exceptional durability.',
    longDescription: 'The Forland L2 represents the pinnacle of light-duty urban logistics. Engineered with fuel efficiency and maneuverability at its core, it features a reinforced chassis built to withstand the high temperatures and demanding road conditions of the Middle East. Its Isuzu-derived powertrain ensures that every rial spent on fuel translates into maximum payload delivery.',
    specs: {
      "Payload": "2.5 Tons",
      "Power": "110 HP",
      "Torque": "310 Nm",
      "Wheelbase": "2850 mm"
    },
    detailedSpecs: {
      performance: {
        "Engine Model": "BJ493ZLQV1",
        "Displacement": "2771 cc",
        "Max Power": "81 kW @ 3600 rpm",
        "Max Torque": "310 Nm @ 2000 rpm",
        "Emission": "Euro III"
      },
      dimensions: {
        "Overall Length": "5445 mm",
        "Overall Width": "1900 mm",
        "Overall Height": "2260 mm",
        "Cargo Body": "3350 x 1810 x 380 mm"
      },
      capacities: {
        "GVW": "4495 kg",
        "Fuel Tank": "80 Liters",
        "Seating": "3 Persons"
      }
    },
    colors: [
      { name: 'Arctic White', hex: '#FFFFFF' },
      { name: 'Industrial Silver', hex: '#C0C0C0' }
    ]
  },
  {
    id: 'foton-aumark',
    name: 'Foton Aumark S',
    brand: 'Foton',
    category: 'medium',
    capacity: '6 Tons',
    engine: '3.8L Cummins ISF',
    price: 'OMR 12,000',
    image: '/medium.png',
    engineImage: '/hero-blue.png',
    gallery: [
      { url: '/medium.png', type: 'image', label: 'URBAN MASTER' },
      { url: '/hero-blue.png', type: 'image', label: 'INTERIOR COMFORT' },
      { url: '/medium.png', type: 'image', label: 'AERODYNAMICS' },
      { url: '/truck_showcase.png', type: 'image', label: 'NIGHT PROFILE' },
      { url: '/hero-blue.png', type: 'image', label: 'CUMMINS ENGINE' },
      { url: '/medium.png', type: 'image', label: 'CABIN DETAIL' },
      { url: '/truck_showcase.png', type: 'image', label: 'DASHBOARD TECH' },
      { url: '/hero-blue.png', type: 'image', label: 'SUSPENSION' },
      { url: '/medium.png', type: 'image', label: 'BRAKING SYSTEM' },
      { url: '/truck_showcase.png', type: 'image', label: 'SIDE VIEW' },
      { url: '/hero-blue.png', type: 'image', label: 'TAIL LIGHTS' }
    ],
    description: 'A versatile medium-duty truck for regional logistics. Powered by world-class Cummins engine and ZF transmission.',
    longDescription: 'Designed in collaboration with European engineering standards, the Foton Aumark S integrated the world-renowned Cummins ISF engine with a precise ZF 6-speed transmission. This combination delivers unparalleled uptime and efficiency, making it the preferred choice for Omani distributors looking for a reliable medium-duty workhorse.',
    specs: {
      "Payload": "6 Tons",
      "Power": "154 HP",
      "Torque": "500 Nm",
      "Wheelbase": "3800 mm"
    },
    detailedSpecs: {
      performance: {
        "Engine Model": "Cummins ISF3.8",
        "Displacement": "3760 cc",
        "Max Power": "115 kW @ 2600 rpm",
        "Max Torque": "500 Nm @ 1200-2200 rpm",
        "Transmission": "ZF 6-Speed Manual"
      },
      dimensions: {
        "Overall Length": "6945 mm",
        "Overall Width": "2200 mm",
        "Overall Height": "2450 mm",
        "Cargo Body": "5150 x 2100 x 550 mm"
      },
      capacities: {
        "GVW": "9000 kg",
        "Fuel Tank": "120 Liters",
        "Tire Size": "8.25R16"
      }
    },
    colors: [
      { name: 'Power Blue', hex: '#0047AB' },
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Metallic Grey', hex: '#4A4A4A' }
    ]
  },
  {
    id: 'howo-t7h',
    name: 'Sinotruk HOWO T7H',
    brand: 'HOWO',
    category: 'heavy',
    capacity: '40 Tons',
    engine: '12.5L MC13 (MAN Technology)',
    price: 'OMR 28,000',
    image: '/heavy.png',
    engineImage: '/hero-red.png',
    gallery: [
      { url: '/heavy.png', type: 'image', label: 'HEAVY HAULER' },
      { url: '/hero-red.png', type: 'image', label: 'DESERT PROFILE' },
      { url: '/heavy.png', type: 'image', label: 'DUAL FUEL TANKS' },
      { url: '/hero-red.png', type: 'image', label: 'SLEEPER CAB' },
      { url: '/heavy.png', type: 'image', label: 'EXHAUST SYSTEM' },
      { url: '/truck_showcase.png', type: 'image', label: 'AXLE ASSEMBLY' },
      { url: '/hero-red.png', type: 'image', label: 'GRILL DETAIL' },
      { url: '/heavy.png', type: 'image', label: 'NIGHT RUN' },
      { url: '/truck_showcase.png', type: 'image', label: 'CHASSIS TOP' },
      { url: '/hero-red.png', type: 'image', label: 'DYNAMIC ANGLE' }
    ],
    description: 'The king of the desert. Built with MAN technology for heavy hauling across the Salalah-Muscat highway.',
    longDescription: 'The Sinotruk HOWO T7H is a testament to heavy-duty capability. Incorporating advanced MAN engine technology from Germany, it provides the extreme torque required for long-haul transport through Omani mountain passes and desert plains. Its luxury sleeper cabin ensures operator fatigue is minimized during multi-day cross-border logistics.',
    specs: {
      "GCW": "40 Tons",
      "Horsepower": "540 HP",
      "Torque": "2500 Nm",
      "Drive": "6x4"
    },
    detailedSpecs: {
      performance: {
        "Engine Model": "MC13.54-50",
        "Displacement": "12,419 cc",
        "Max Power": "397 kW @ 1900 rpm",
        "Max Torque": "2500 Nm @ 1050-1350 rpm",
        "Transmission": "HW25712XST (12 forward, 2 reverse)"
      },
      dimensions: {
        "Fifth Wheel Height": "1280 mm",
        "Front Overhang": "1500 mm",
        "Rear Overhang": "725 mm",
        "Chassis Weight": "8800 kg"
      },
      capacities: {
        "Front Axle": "VGD95 (9.5 Tons)",
        "Rear Axle": "MCP16 (16 Tons x 2)",
        "Fuel Tank": "600 + 400 Liters (Dual)",
        "Clutch": "430mm Diaphragm"
      }
    },
    colors: [
      { name: 'Inferno Red', hex: '#B22222' },
      { name: 'Steel Silver', hex: '#778899' },
      { name: 'Obsidian Black', hex: '#000000' }
    ]
  },
  {
    id: 'howo-tipper',
    name: 'Sinotruk HOWO 6x4 Tipper',
    brand: 'HOWO',
    category: 'dump',
    capacity: '20 Cubic Meters',
    engine: '9.7L WD615',
    price: 'OMR 24,500',
    image: '/truck_showcase.png',
    engineImage: '/heavy.png',
    gallery: [
      { url: '/truck_showcase.png', type: 'image', label: 'SITE WORKER' },
      { url: '/hero-silver.png', type: 'image', label: 'BOX DETAIL' },
      { url: '/truck_showcase.png', type: 'image', label: 'HYDRAULICS' },
      { url: '/heavy.png', type: 'image', label: 'OFF-ROAD TIRES' },
      { url: '/truck_showcase.png', type: 'image', label: 'STEEL BODY' },
      { url: '/heavy.png', type: 'image', label: 'REAR VIEW' },
      { url: '/hero-silver.png', type: 'image', label: 'OPERATOR SEAT' },
      { url: '/truck_showcase.png', type: 'image', label: 'SAFETY CAGE' },
      { url: '/heavy.png', type: 'image', label: 'DUST PROTECTION' },
      { url: '/hero-silver.png', type: 'image', label: 'FINAL QA' }
    ],
    description: 'Engineered for the toughest Omani construction sites. High-strength steel body for maximum reliability.',
    longDescription: 'The HOWO 6x4 Tipper is unyielding in the face of volcanic rock and desert sand. Its WD615 engine platform is legendary for simplicity and durability, allowing for field maintenance in remote locations. The reinforced ventral lift hydraulic system ensures consistent tipping performance even at 100% load capacity.',
    specs: {
      "Capacity": "20 Cubic Meters",
      "Horsepower": "371 HP",
      "Torque": "1500 Nm",
      "Drive": "6x4"
    },
    detailedSpecs: {
      performance: {
        "Engine Model": "WD615.47",
        "Displacement": "9726 cc",
        "Max Power": "273 kW @ 2000 rpm",
        "Max Torque": "1500 Nm @ 1100-1600 rpm",
        "Emission": "Euro II"
      },
      dimensions: {
        "Tipper Box": "5600 x 2300 x 1500 mm",
        "Box Thickness": "Floor 10mm, Side 8mm",
        "Lifting System": "Ventral Lift (Optional Front Lift)"
      },
      capacities: {
        "Payload": "25,000 kg",
        "Front Axle": "HF9 (9 Tons)",
        "Rear Axle": "HC16 (16 Tons x 2)",
        "Fuel Tank": "300 Liters"
      }
    },
    colors: [
      { name: 'Construction Yellow', hex: '#FFD700' },
      { name: 'Safety White', hex: '#FFFFFF' }
    ]
  }
];

export async function getTrucks(category?: string): Promise<Truck[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (category) {
    return mockTrucks.filter(t => t.category === category as any);
  }
  return mockTrucks;
}

export async function getTruckById(id: string): Promise<Truck | undefined> {
  return mockTrucks.find(t => t.id === id);
}
