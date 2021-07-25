import time
import subprocess as sp
import sys
from distutils.dir_util import copy_tree
import os


def build():
    args: list = sys.argv
    build_server: bool = True
    build_frontend: bool = True

    curdir = os.path.dirname(os.path.realpath(__file__))

    if len(args) == 2:
        build_server = True if 's' in args[1] else False
        build_frontend = True if 'f' in args[1] else False

    if build_server:
        print('Building server')
        server_build_dir = os.path.join(curdir, "server")
        sp.call(f'cd {server_build_dir} && npm run build', shell=True)
        copy_tree(f'{os.path.join(server_build_dir, "out")}', f'{os.path.join(curdir, "build")}')
        copy_tree(f'{os.path.join(server_build_dir, "data")}', f'{os.path.join(curdir, "build/data")}')

    if build_frontend:
        print('Building frontend')
        frontend_build_dir = os.path.join(curdir, "frontend")
        sp.call(f'cd {frontend_build_dir} && npm run build', shell=True)
        copy_tree(f'{os.path.join(frontend_build_dir, "dist")}', f'{os.path.join(curdir, "build/dist")}')


if __name__ == '__main__':
    print('Starting build')
    start = time.perf_counter()
    build()
    end = time.perf_counter()
    print(f'Build finished in {end - start:0.2f}s')
