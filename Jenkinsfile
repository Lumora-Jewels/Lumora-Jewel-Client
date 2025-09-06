pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lumora-Jewels/Lumora-Jewel-Client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Define deploy directory
                DEPLOY_DIR=/var/www/lumora-jewel-client

                # Create deploy folder if not exists
                mkdir -p $DEPLOY_DIR

                # Copy build output
                rm -rf $DEPLOY_DIR/*
                cp -r dist/* $DEPLOY_DIR/

                # Restart nginx to serve new files
                sudo systemctl restart nginx || true
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
        }
        failure {
            echo '❌ Frontend deployment failed!'
        }
    }
}
