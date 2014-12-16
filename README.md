

Exploring and analyzing npm registry data.

# tl;dr

```bash
dat init
dat pull #takes a while
./run-pipes.sh
```

The data, nicely transformed, is now in `data/`.

```bash
virtualenv env
source env/bin/activate
pip install -r requirements.txt
ipython notebook
```

Enjoy.


# dat is for syncing data

The `dat pull` will take a while: it's pulling down all the (tabular) npm registry
data from npm.dathub.org.

```bash
dat init
dat pull
```

(If you don't want to install dat locally, run the one in `node_modules/.bin`.)


# gasket is for transforming it.

The raw registry data is a little much for the analyses we want to run; we'll use
[gasket][1] to pipe it through some transforms.  It's easy to add new ones, and
by having them so neatly stored in the `package.json`, it's portable/reproduceable.

For example, this package includes one, called 'deps-size-all' that focuses the 
dataset down to tarball sizes and dependency lists.  Check it out like so:

```bash
dat cat --limit=100 | gasket run deps-size-all
```
(If you don't want to install gasket locally, run the one in `node_modules/.bin`.)


To run all the gaskets in this package and output their results to the `data/`
directory (where the iPython notebook below will be expecting them), just do:

```bash
./run-pipes.sh
```


# python is for exploring and analyzing it.

[iPython Notebooks][2] is a nice way to explore the data and end up with a nice,
somewhat reusable record of the various analyses you tried out.

Set up a local virtualenv like so:

```bash
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

and then run the notebook server:

```bash
ipython notebook
```

And browse to [explore.ipynb][3].

(Note: this approach very much influenced by Irene Ros's [npm-by-the-numbers][5])


# Thanks

- [dat project][4]
- [iros/npm-by-the-numbers][5]


[1]: https://github.com/datproject/gasket
[2]: http://ipython.org/notebook.html
[3]: http://localhost:8888/notebooks/explore.ipynb
[4]: https://github.com/maxogden/dat
[5]: http://npmbynumbers.bocoup.com/
