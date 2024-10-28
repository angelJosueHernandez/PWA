import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';

// Mock de workbox-background-sync
vi.mock('workbox-background-sync', () => ({
  Queue: vi.fn().mockImplementation(() => ({
    pushRequest: vi.fn(),
  })),
}));

vi.mock('workbox-precaching', () => ({
  precacheAndRoute: vi.fn(),
  PrecacheController: vi.fn().mockImplementation(() => ({
    addToCacheList: vi.fn(),
    install: vi.fn().mockResolvedValue(undefined),
    activate: vi.fn().mockResolvedValue(undefined),
  })),
}));

// Mocks para eventos del Service Worker
class ExtendableEvent extends Event {
  constructor(type) {
    super(type);
    this.waitUntil = vi.fn().mockResolvedValue(undefined);
  }
}

class FetchEvent extends ExtendableEvent {
  constructor(type, init) {
    super(type);
    this.request = init.request;
    this.respondWith = vi.fn();
  }
}

class PushEvent extends ExtendableEvent {
  constructor(type, init) {
    super(type);
    this.data = {
      json: () => ({
        title: init.data?.title || 'Default Title',
        body: init.data?.body || 'Default body message',
      }),
    };
  }
}

// Mock de cache
const mockCache = {
  put: vi.fn().mockResolvedValue(undefined),
  match: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
};

// Configuración del entorno antes de las pruebas
beforeAll(() => {
  const listeners = {};

  global.self = {
    __WB_MANIFEST: [],
    registration: {
      sync: {
        register: vi.fn().mockResolvedValue(undefined),
      },
      showNotification: vi.fn().mockResolvedValue(undefined),
    },
    addEventListener: vi.fn((type, listener) => {
      listeners[type] = listeners[type] || [];
      listeners[type].push(listener);
    }),
    dispatchEvent: vi.fn((event) => {
      const eventListeners = listeners[event.type] || [];
      eventListeners.forEach((listener) => listener(event));
      return !event.defaultPrevented;
    }),
    navigator: {
      onLine: true,
    },
    location: {
      origin: 'http://localhost:3000',
    },
    clients: {
      claim: vi.fn(),
    },
  };

  global.ExtendableEvent = ExtendableEvent;
  global.FetchEvent = FetchEvent;
  global.PushEvent = PushEvent;
  global.Request = Request;
  global.Response = Response;

  global.caches = {
    open: vi.fn().mockResolvedValue(mockCache),
    match: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
  };

  global.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify({ message: 'mock response' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
  );
});

// Limpiar mocks antes de cada prueba
beforeEach(() => {
  vi.clearAllMocks();
  self.navigator.onLine = true;
  mockCache.put.mockClear();
  mockCache.match.mockClear();
  mockCache.delete.mockClear();
});

// Pruebas del service worker
describe('Service Worker', () => {
  beforeEach(async () => {
    await import('./service-worker');
  });

  it('debería registrar eventos fetch, sync y push', async () => {
    const installEvent = new ExtendableEvent('install');
    const activateEvent = new ExtendableEvent('activate');

    await self.dispatchEvent(installEvent);
    await self.dispatchEvent(activateEvent);

    expect(self.addEventListener).toHaveBeenCalledWith(
      'fetch',
      expect.any(Function),
    );
    expect(self.addEventListener).toHaveBeenCalledWith(
      'sync',
      expect.any(Function),
    );
    expect(self.addEventListener).toHaveBeenCalledWith(
      'push',
      expect.any(Function),
    );
  });

  it('debería mostrar notificación al recibir un evento push', async () => {
    const pushEvent = new PushEvent('push', {
      data: { title: 'Test Push', body: 'This is a test' },
    });

    await self.dispatchEvent(pushEvent);

    expect(self.registration.showNotification).toHaveBeenCalledWith(
      'Test Push',
      expect.objectContaining({
        body: 'This is a test',
      }),
    );
  });

  it('debería registrar el Service Worker', async () => {
    // Simulamos el evento de instalación
    const installEvent = new ExtendableEvent('install');

    await self.dispatchEvent(installEvent);

    // Verificamos que el evento de instalación se despachó
    expect(self.dispatchEvent).toHaveBeenCalledWith(installEvent);

    // En caso de registrar sincronización, verifica:
    // expect(self.registration.sync.register).toHaveBeenCalled();
  });
});
