import type { ApiCollection, ApiEndpoint } from './types';

export function parsePostmanCollection(json: any): ApiCollection | null {
  try {
    // Basic Postman v2.1 format support
    if (json.info && json.item) {
      const endpoints: ApiEndpoint[] = [];
      
      const parseItems = (items: any[], prefix = '') => {
        items.forEach((item: any) => {
          if (item.item) {
            // Folder
            parseItems(item.item, `${prefix}${item.name}/`);
          } else if (item.request) {
            // Request
            const req = item.request;
            endpoints.push({
              id: item.id || `${Date.now()}-${Math.random()}`,
              name: `${prefix}${item.name}`,
              method: req.method,
              url: typeof req.url === 'string' ? req.url : req.url?.raw || '',
              headers: req.header?.reduce((acc: any, h: any) => {
                acc[h.key] = h.value;
                return acc;
              }, {}),
              body: req.body?.raw,
              description: item.description,
            });
          }
        });
      };

      parseItems(json.item);

      return {
        name: json.info.name,
        endpoints,
      };
    }

    // Simple custom format
    if (json.endpoints && Array.isArray(json.endpoints)) {
      return json as ApiCollection;
    }

    return null;
  } catch (err) {
    console.error('Failed to parse collection:', err);
    return null;
  }
}

export function exportCollection(collection: ApiCollection): string {
  return JSON.stringify(collection, null, 2);
}

export function createSampleCollection(): ApiCollection {
  return {
    name: 'Sample Haunted APIs',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoints: [
      {
        id: '1',
        name: 'Get Users',
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        description: 'Fetch all users from the haunted database',
      },
      {
        id: '2',
        name: 'Get User by ID',
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users/1',
        description: 'Summon a specific user spirit',
      },
      {
        id: '3',
        name: 'Create Post',
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        body: JSON.stringify({
          title: 'Haunted Message',
          body: 'From beyond the grave...',
          userId: 1,
        }, null, 2),
        description: 'Send a message to the spirit realm',
      },
      {
        id: '4',
        name: 'Get Posts',
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        description: 'Read messages from the dead',
      },
      {
        id: '5',
        name: 'Trigger 404',
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/nonexistent',
        description: 'Summon the 404 Ghost',
      },
    ],
  };
}
