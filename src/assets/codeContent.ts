export const startComment = `#Type anything to begin coding! You are paid for each line of code you write.`
export const codeContent = 
`\ndef hello_world():
    print("Hello World")

def bubbleSort(arr):
    n = len(arr)
    #Traverse through all array elements
    for i in range(n):
        #Last i elements are already in place
        for j in range(0, n-i-1):
            #traverse the array from 0 to n-i-1
            #Swap if the element found is greater
            #than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        mergeSort(L)
        mergeSort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

def partition(l, r, nums):
    pivot, ptr = nums[r], l
    for i in range(l, r):
        if nums[i] <= pivot:
            nums[i], nums[ptr] = nums[ptr], nums[i]
            ptr += 1
    nums[ptr], nums[r] = nums[r], nums[ptr]
    return ptr

def quicksort(l, r, nums):
    if len(nums) == 1:
        return nums
    if l < r:
        pi = partition(l, r, nums)
        quicksort(l, pi-1, nums)
        quicksort(pi+1, r, nums)
    return nums

def search(arr, n, x):
    for i in range(0, n):
        if (arr[i] == x):
            return i
    return -1

def binarySearch(arr, l, r, x):
    #Check base case
    if r >= l:
        mid = l + (r - l) // 2
        #If element is present at the middle itself
        if arr[mid] == x:
            return mid
        #If element is smaller than mid, then it
        #can only be present in left subarray
        elif arr[mid] > x:
            return binarySearch(arr, l, mid-1, x)
        #Else the element can only be present
        #in right subarray
        else:
            return binarySearch(arr, mid + 1, r, x)
    else:
        #Element is not present in the array
        return -1

def DFS(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for next in graph[start] - visited:
        DFS(graph, next, visited)
    return visited
`

const faultyCode = 
`visited = [False] * (max(graph) + 1)
#Create a queue for BFS
queue = []
#Mark the source node as
#visited and enqueue it
queue.append(s)
visited[s] = True
while queue:
    #Dequeue a vertex from
    #queue and print it
    s = queue.pop(0)
    print (s, end = " ")
    #Get all adjacent vertices of the
    #dequeued vertex s. If a adjacent
    #has not been visited, then mark it
    #visited and enqueue it
    for i in graph[s]:
        if visited[i] == False:
            queue.append(i)
            visited[i] = True

def DFS(graph, start, visited=None):
if visited is None:
    visited = set()
visited.add(start)
for next in graph[start] - visited:
    DFS(graph, next, visited)
return visited`