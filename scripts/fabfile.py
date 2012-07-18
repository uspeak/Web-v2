from fabric.api import *
from fabric.contrib.project import rsync_project

@hosts('syrus@uspeakapp.com')
def sync():
    gitignore = file('../.gitignore')
    excludes = [line.strip() for line in gitignore.readlines()]
    excludes.append('.git/*')
    rsync_project("/home/uspeak/games/testapp", "../",exclude=excludes)
    #restart()

@hosts('syrus@uspeakapp.com')
def restart():
    run('sudo /etc/init.d/httpd restart')