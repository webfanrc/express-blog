module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      key  : "~/Desktop/LightsailDefaultKey-ap-northeast-1.pem",
      user : 'bitnami',
      host : '3.112.132.226',
      ref  : 'origin/master',
      repo : 'git@github.com:RuoChen95/express-blog.git',
      path : '/data',
      "ssh_options": "StrictHostKeyChecking=no",
      'post-setup' : 'sudo -s && ls -la',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production && cd /data/vue-blog && git pull && npm run build && nginx -s reload',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
