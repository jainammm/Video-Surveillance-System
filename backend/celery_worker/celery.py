from celery import Celery

app = Celery('proj',
    broker='sqla+sqlite:///celerydb.sqlite',
    include=['celery_worker.tasks'])

# Optional configuration, see the application user guide.
app.conf.update(
    result_backend = 'db+sqlite:///celerydb.sqlite',
    task_serializer = 'json',
)

if __name__ == '__main__':
    app.start()