import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const seed = async () => {
  try {
    console.log('🔄 Inserting data from API request...');

    // Create passengers
    const passenger1 = await axios.post(`${API_BASE}/passengers`, {
      name: 'Jane Smith',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      password: 'mypassword456',
      document: '987654321',
      phoneNumber: '0987654321',
      documentType: 'CC',
    });

    const passenger2 = await axios.post(`${API_BASE}/passengers`, {
      name: 'Maria Fernández',
      lastName: 'Fernández',
      email: 'mariafernandez@example.com',
      password: 'securepassword321',
      document: '998877665',
      phoneNumber: '2345678901',
      documentType: 'CC',
    });

    const passenger3 = await axios.post(`${API_BASE}/passengers`, {
      name: 'Pedro Martínez',
      lastName: 'Martínez',
      email: 'pedromartinez@example.com',
      password: 'strongpassword456',
      document: '556677889',
      phoneNumber: '3456789012',
      documentType: 'CC',
    });

    const passenger4 = await axios.post(`${API_BASE}/passengers`, {
      name: 'Laura López',
      lastName: 'López',
      email: 'lauralopez@example.com',
      password: 'password1234',
      document: '667788990',
      phoneNumber: '4567890123',
      documentType: 'CC',
    });

    await axios.post(`${API_BASE}/passengers`, {
      name: 'David Pérez',
      lastName: 'Pérez',
      email: 'davidperez@example.com',
      password: 'mypassword789',
      document: '334455667',
      phoneNumber: '5678901234',
      documentType: 'CC',
    });

    // Create drivers
    const driver1 = await axios.post(`${API_BASE}/drivers`, {
      name: 'Nearby Driver 1',
      lastName: 'Ramírez',
      email: 'nearby1@example.com',
      password: 'pass123',
      isActive: true,
      latitude: 4.65,
      longitude: -74.245,
      license: 'LIC123',
      document: 'DOC1232343',
      phoneNumber: '3210000001',
      documentType: 'CC',
    });

    const driver2 = await axios.post(`${API_BASE}/drivers`, {
      name: 'Nearby Driver 2',
      lastName: 'López',
      email: 'nearby2@example.com',
      password: 'pass456',
      isActive: true,
      latitude: 4.647,
      longitude: -74.248,
      license: 'LIC456',
      document: 'DOC456321',
      phoneNumber: '3210000002',
      documentType: 'CC',
    });

    const driver3 = await axios.post(`${API_BASE}/drivers`, {
      name: 'Nearby Driver 3',
      lastName: 'Martínez',
      email: 'nearby3@example.com',
      password: 'pass789890',
      isActive: true,
      latitude: 4.651,
      longitude: -74.244,
      license: 'LIC789',
      document: 'DOC789',
      phoneNumber: '3210000003',
      documentType: 'CC',
    });

    const driver4 = await axios.post(`${API_BASE}/drivers`, {
      name: 'Nearby Driver 4',
      lastName: 'García',
      email: 'nearby4@example.com',
      password: 'pass012',
      isActive: true,
      latitude: 4.649,
      longitude: -74.246,
      license: 'LIC012',
      document: 'DOC012456',
      phoneNumber: '3210000004',
      documentType: 'CC',
    });

    await axios.post(`${API_BASE}/drivers`, {
      name: 'Far Driver 1',
      lastName: 'Castro',
      email: 'far1@example.com',
      password: 'pass789',
      isActive: true,
      latitude: 4.62, // ~5 km sur
      longitude: -74.25,
      license: 'LIC789',
      document: 'DOC7890901',
      phoneNumber: '3210000003',
      documentType: 'CC',
    });

    await axios.post(`${API_BASE}/drivers`, {
      name: 'Far Driver 2',
      lastName: 'Gómez',
      email: 'far2@example.com',
      password: 'pass000',
      isActive: true,
      latitude: 4.68, // ~6 km norte
      longitude: -74.24,
      license: 'LIC000',
      document: 'DOC0003023',
      phoneNumber: '3210000004',
      documentType: 'CC',
    });

    // Create trips
    const trip1 = await axios.post(`${API_BASE}/trips`, {
      price: 12000,
      origin: 'Calle 100',
      destination: 'Calle 50',
      driverId: (driver1.data as { id: number }).id,
      passengerId: (passenger1.data as { id: number }).id,
    });

    const trip2 = await axios.post(`${API_BASE}/trips`, {
      price: 10000,
      origin: 'Calle 100',
      destination: 'Calle 50',
      driverId: (driver2.data as { id: number }).id,
      passengerId: (passenger2.data as { id: number }).id,
    });

    const trip3 = await axios.post(`${API_BASE}/trips`, {
      price: 5000,
      origin: 'Calle 100',
      destination: 'Calle 50',
      driverId: (driver3.data as { id: number }).id,
      passengerId: (passenger3.data as { id: number }).id,
    });

    const trip4 = await axios.post(`${API_BASE}/trips`, {
      price: 7500,
      origin: 'Calle 100',
      destination: 'Calle 50',
      driverId: (driver4.data as { id: number }).id,
      passengerId: (passenger4.data as { id: number }).id,
    });

    const tripId1 = (trip1.data as { id: number }).id;
    const tripId2 = (trip2.data as { id: number }).id;
    const tripId3 = (trip3.data as { id: number }).id;
    const tripId4 = (trip4.data as { id: number }).id;

    await axios.patch(`${API_BASE}/trips/${tripId1}`, {
      status: 'IN_SERVICE',
      startTime: '12:30:30',
    });

    await axios.patch(`${API_BASE}/trips/${tripId2}`, {
      status: 'IN_SERVICE',
      startTime: '12:30:30',
    });

    await axios.patch(`${API_BASE}/trips/${tripId3}`, {
      status: 'IN_SERVICE',
      startTime: '12:30:30',
    });

    await axios.patch(`${API_BASE}/trips/${tripId4}`, {
      status: 'CANCELLED',
    });

    await axios.patch(`${API_BASE}/trips/${tripId3}`, {
      status: 'COMPLETED',
      endTime: '12:50:30',
    });

    console.log('✅ Data inserted.');
  } catch (err) {
    console.error('❌ Error inserting data:', err);
  }
};

seed();
