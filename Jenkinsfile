pipeline {
    agent any
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        KUBECONFIG_ID = 'my-kubeconfig'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ecr-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                     aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 435770184212.dkr.ecr.us-east-1.amazonaws.com
                     docker build -t devops .
                     docker tag devops:latest 435770184212.dkr.ecr.us-east-1.amazonaws.com/devops:latest
                     docker push 435770184212.dkr.ecr.us-east-1.amazonaws.com/devops:latest
                    '''
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                withAWS(credentials: 'my-aws-secret') {
                    withCredentials([file(credentialsId: "${KUBECONFIG_ID}", variable: 'KUBECONFIG')]) {
                        sh "kubectl delete deployment.apps/deployment-2048100 -n game-204873"
                        sh "kubectl delete service/service-2048102 -n game-204873"
                        sh "kubectl apply -f HomeApp.yaml"
                        sh "kubectl apply -f Ingress.yaml"
                    }
                }
            }
        }
    }
}
