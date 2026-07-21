const fs = require('fs')

const logs = Array.from({ length: 10000 }, (_, i) => ({
    actor: `user${i}@company.com`,
    role: ['admin', 'engineer', 'viewer'][i % 3],
    action: ['DELETE_USER', 'UPDATE_CONFIG', 'LOGIN', 'EXPORT_DATA'][i % 4],
    resource: `/api/resource/${i}`,
    resourceType: ['USER', 'CONFIG', 'SESSION'][i % 3],
    ipAddress: `192.168.${Math.floor(i / 255)}.${i % 255}`,
    region: ['ap-south-1', 'us-east-1', 'eu-west-1'][i % 3],
    severity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][i % 4],
    status: i % 2 === 0 ? 'Resolved' : 'Unresolved',
    timestamp: new Date(Date.now() - i * 60000).toISOString()
}))
fs.writeFileSync('logs.json', JSON.stringify({ logs }))
console.log('Generated 10,000 logs → logs.json')