import subprocess, sys

result = subprocess.run(
    [r'node_modules\.bin\sass.cmd',
     r'src/scss/mastorscdn.scss',
     r'dist/css/mastorscdn.css',
     '--style=compressed',
     '--no-source-map'],
    cwd=r'D:\Web\Mastors CDN\Main',
    capture_output=True,
    text=True
)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Exit code:", result.returncode)
