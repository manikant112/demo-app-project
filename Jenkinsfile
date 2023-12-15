def imageName='manikantk262/quokka-backend'
def imageid
def containerid
pipeline{
    agent{
        label 'docker'
    }
    options{
        timeout(time:3, unit:'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }
    tools {
       dockerTool 'docker'
    }
    stages{
        stage("checkout"){
            
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'githubtoken', url: 'https://github.com/manikant112/demo-app-project.git']])
            }
        }
        stage("remove old builds and container"){
            steps{
                catchError(buildResult:'SUCCESS'){
                    script{
                        sh "docker rm -f quokka"
                        imageid = sh (
                            script: "/home/azureuser/project/workspace/getimageid.sh",
                            returnStdout: true
                        ) 
                        sh "docker rmi ${imageid}"
                    }
                }
            }
        }
        stage("build image"){
            steps{
                script{
                  sh "docker build -t ${imageName}:${BUILD_NUMBER} ."
                } 
            }
        }
        stage("push image to docker hub"){
            steps{
                script{
                    sh "docker push ${imageName}:${BUILD_NUMBER}"
                }
            }
        }
        stage("create container"){
            steps{
                script{
                    sh "docker run -d -p 3000:3000 --name quokka ${imageName}:${BUILD_NUMBER}"
                }
            }
        }
        
    }
    post{
        always{
            emailext body: '''
                Hi , 
                 
                 Build Result for $PROJECT_NAME -- 
                 Build NO. $BUILD_NUMBER
                 Status $BUILD_STATUS

                 Check console output at $BUILD_URL to view the results.
                 
                 Thanks
             ''', 
             subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'manikant9682@gmail.com'
        }
    }
}
