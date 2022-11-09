/*
    think of the array like a binary tree - cause that's what we're doing/*
        - don't use a[0], use a[1] instead to simplify the arithmetic
    every parent must be >= to its child/*

    largest key is the root/*

    parent of k is at k/2
    children of k are at 2K and 2k + 1

    if child's value larger than it's parent, swap the two and repeat until the condition is satisfied
*/ 
export class BinaryHeap {

}