/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FilterTree, FilteredTree } from './filtered';
import { HostTree } from './host-tree';
import { FilePredicate, MergeStrategy, Tree } from './interface';
import { VirtualTree } from './virtual';


export function empty() {
  return new HostTree();
}

export function branch(tree: Tree) {
  // TODO: Remove VirtualTree usage in 7.0
  if (tree instanceof VirtualTree) {
    return VirtualTree.branch(tree);
  }

  return tree.branch();
}

export function merge(tree: Tree, other: Tree, strategy: MergeStrategy = MergeStrategy.Default) {
  // TODO: Remove VirtualTree usage in 7.0
  if (tree instanceof VirtualTree) {
    return VirtualTree.merge(tree, other, strategy);
  }

  tree.merge(other, strategy);

  return tree;
}

export function partition(tree: Tree, predicate: FilePredicate<boolean>): [Tree, Tree] {
  // TODO: Remove VirtualTree usage in 7.0
  if (tree instanceof VirtualTree) {
    return [
      new FilteredTree(tree, predicate),
      new FilteredTree(tree, (path, entry) => !predicate(path, entry)),
    ];
  } else {
    return [
      new FilterTree(tree, predicate),
      new FilterTree(tree, (path, entry) => !predicate(path, entry)),
    ];
  }
}

export function optimize(tree: Tree) {
  // TODO: Remove VirtualTree usage in 7.0
  if (tree instanceof VirtualTree) {
    return VirtualTree.optimize(tree);
  }

  return tree;
}
