from copyreg import constructor
import os
import json


src_dir = 'convos/'


def open_file(filepath):
    with open(filepath, 'r', encoding='ISO-8859-1') as infile:
        return infile.read()
        w


if __name__ == '__main__':
    files = os.listdir(src_dir)
    data = list()
    for file in files:
        lines = open_file(src_dir + file).splitlines()
        compact = [i for i in lines if len(i) > 1]
        print(compact)
        if 'User:' in compact[-1]:
            a = compact.pop(-1)
            print(a)
        completion = compact.pop(-1).replace('Pal:', '')
        print(file, lines[0])
        new = list()
        for i in compact:
            if 'User:' in i:
                new.append(i.lower().replace('user:', 'User:').replace('.','').replace(',','').replace('!','').replace('?','').replace('"',''))
            else:
                new.append(i.replace('-',' ').replace('  ', ' '))
        prompt = '\n'.join(new) + '\nPal:'
        info = {'prompt': prompt, 'completion': completion}
        data.append(info)
    with open('Pal.jsonl', 'w') as outfile:
        for i in data:
            json.dump(i, outfile)
            outfile.write('\n')