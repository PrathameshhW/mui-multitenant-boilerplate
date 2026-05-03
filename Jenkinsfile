def siteIdVarFor(String client) {
  return "NETLIFY_SITE_ID_${client.toUpperCase().replaceAll(/[^A-Z0-9]+/, '_')}"
}

pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    booleanParam(
      name: 'SKIP_DEPLOY',
      defaultValue: false,
      description: 'Build all detected clients but skip Netlify deployment.'
    )
  }

  environment {
    NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Type Check') {
      steps {
        sh 'npx tsc -b'
      }
    }

    stage('Discover Clients') {
      steps {
        script {
          env.CLIENTS = sh(
            script: "find src/clients -mindepth 1 -maxdepth 1 -type d -exec basename {} \\; | sort | paste -sd ',' -",
            returnStdout: true
          ).trim()

          if (!env.CLIENTS) {
            error('No client folders were found under src/clients.')
          }

          echo "Discovered clients: ${env.CLIENTS}"
        }
      }
    }

    stage('Build Clients In Parallel') {
      steps {
        script {
          def clients = env.CLIENTS.split(',') as List<String>
          def branches = [:]

          for (String client : clients) {
            branches[client] = {
              sh """
                set -eu
                rm -rf dist/${client}
                VITE_ORG_NAME=${client} npx vite build --mode ${client} --outDir dist/${client}
              """
            }
          }

          parallel branches
        }
      }
    }

    stage('Archive Build') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Deploy To Netlify') {
      when {
        expression { !params.SKIP_DEPLOY }
      }
      steps {
        script {
          def clients = env.CLIENTS.split(',') as List<String>
          def branches = [:]

          for (String client : clients) {
            branches[client] = {
              def siteIdVar = siteIdVarFor(client)
              def siteId = env[siteIdVar]

              if (!siteId?.trim()) {
                error("Missing Jenkins environment variable ${siteIdVar} for client ${client}.")
              }

              sh """
                set -eu
                npx netlify-cli deploy \
                  --auth "${NETLIFY_AUTH_TOKEN}" \
                  --site "${siteId}" \
                  --dir "dist/${client}" \
                  --prod \
                  --message "Jenkins deploy ${env.JOB_NAME} #${env.BUILD_NUMBER} (${client})"
              """
            }
          }

          parallel branches
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
